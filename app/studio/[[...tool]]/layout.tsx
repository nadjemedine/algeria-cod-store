export const metadata = {
    title: 'Sanity Studio',
    description: 'Sanity Studio for Boutique Celinaa',
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body style={{ margin: 0 }}>{children}</body>
        </html>
    )
}
