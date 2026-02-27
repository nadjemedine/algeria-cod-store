export const metadata = {
    title: 'Sanity Studio',
    description: 'Sanity Studio for IX Boutique',
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr" dir="ltr">
            <body 
                style={{ 
                    margin: 0, 
                    padding: 0, 
                    width: '100%', 
                    height: '100%',
                    overflow: 'hidden'
                }}
                suppressHydrationWarning={true}
            >
                {children}
            </body>
        </html>
    )
}