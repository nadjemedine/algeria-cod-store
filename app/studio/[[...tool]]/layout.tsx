export const metadata = {
    title: 'Sanity Studio',
    description: 'Sanity Studio for IX Boutique',
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr" dir="ltr">
            <body className="inter_5972bc34-module__OU16Qa__className bg-background pb-20 md:pb-0 min-h-screen text-foreground" style={{ margin: 0 }}>{children}</body>
        </html>
    )
}
