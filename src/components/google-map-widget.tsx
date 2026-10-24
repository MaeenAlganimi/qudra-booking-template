"use client"
export function GoogleMapWidget() { const url=process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL;return url?<iframe src={url} title="Studio location" loading="lazy" referrerPolicy="no-referrer"/>:<p>12 Olive Lane, Garden District — fictional demo address.</p> }
