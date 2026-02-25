import { adminClient } from '@/sanity/lib/adminClient';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const orderDoc = {
            _type: 'order',
            fullName: data.fullName,
            phone: data.phone,
            wilaya: data.wilaya,
            deliveryType: data.deliveryType,
            address: data.address,
            notes: data.notes,
            products: data.items.map((item: any) => ({
                _key: crypto.randomUUID(),
                product: {
                    _type: 'reference',
                    _ref: item._id,
                },
                quantity: item.quantity,
                size: item.selectedSize || '',
            })),
            subtotal: data.subtotal,
            deliveryPrice: data.deliveryPrice,
            totalPrice: data.totalPrice,
            status: 'new',
        };

        const result = await adminClient.create(orderDoc);

        // Process Stock Deductions
        for (const item of data.items) {
            try {
                const product = await adminClient.getDocument(item._id);
                if (!product || !product.sizes) continue;

                const sizes = product.sizes as any[];

                // Find target size
                const sizeIndex = sizes.findIndex((s) => s.size === item.selectedSize || s === item.selectedSize);
                if (sizeIndex === -1) continue;

                const targetSize = sizes[sizeIndex];

                // For old products where size is just a string, ignore stock deduction
                if (typeof targetSize !== 'object' || !targetSize._key) continue;

                const currentStock = targetSize.stock || 0;
                const newStock = Math.max(0, currentStock - item.quantity);

                // Update the stock value in the array
                sizes[sizeIndex] = { ...targetSize, stock: newStock };

                // Check if all sizes have 0 stock
                const outOfStock = sizes.every((s: any) => typeof s === 'object' ? s.stock <= 0 : false);

                const patch = adminClient.patch(item._id)
                    .set({
                        [`sizes[_key=="${targetSize._key}"].stock`]: newStock
                    });

                if (outOfStock) {
                    patch.set({ hidden: true });
                }

                await patch.commit();
            } catch (err) {
                console.error(`Failed to update stock for product ${item._id}:`, err);
                // Continue with other items even if one fails
            }
        }

        // Send Email Notification
        if (process.env.RESEND_API_KEY && process.env.NOTIFICATION_EMAIL) {
            try {
                // Formatting product details for the email
                const itemsListHtml = data.items.map((item: any) =>
                    `<li><b>${item.name}</b> (Qty: ${item.quantity}, Size: ${item.selectedSize || 'N/A'})</li>`
                ).join('');

                await resend.emails.send({
                    from: 'Acme <onboarding@resend.dev>', // Resend's default testing sender
                    to: process.env.NOTIFICATION_EMAIL as string,
                    subject: `New Order Received! (${data.totalPrice} DZD)`,
                    html: `
                        <h2>New Order Alert 🛒</h2>
                        <p>You have received a new order on your store.</p>
                        
                        <h3>Customer Details:</h3>
                        <ul>
                            <li><b>Name:</b> ${data.fullName}</li>
                            <li><b>Phone:</b> ${data.phone}</li>
                            <li><b>Wilaya:</b> ${data.wilaya}</li>
                            <li><b>Delivery Type:</b> ${data.deliveryType}</li>
                            <li><b>Address:</b> ${data.address || 'N/A'}</li>
                        </ul>

                        <h3>Order Details:</h3>
                        <ul>${itemsListHtml}</ul>
                        
                        <h3>Pricing summary:</h3>
                        <ul>
                            <li><b>Subtotal:</b> ${data.subtotal} DZD</li>
                            <li><b>Delivery:</b> ${data.deliveryPrice} DZD</li>
                            <li><b>Total:</b> ${data.totalPrice} DZD</li>
                        </ul>
                    `
                });
                console.log("Email notification sent successfully.");
            } catch (emailError) {
                console.error("Failed to send email notification:", emailError);
            }
        }

        return NextResponse.json({ success: true, id: result._id });
    } catch (error: any) {
        console.error('Order creation failed:', error.message);
        return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 500 });
    }
}
