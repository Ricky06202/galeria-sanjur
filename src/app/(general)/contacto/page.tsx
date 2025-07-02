'use client'
import { InstagramIcon } from '@/modules/shared/components/icons/InstagramIcon'
import { WhatsappIcon } from '@/modules/shared/components/icons/WhatsappIcon'
import { GmailIcon } from '@/modules/shared/components/icons/GmailIcon'
import 'leaflet/dist/leaflet.css'
import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/modules/shared/components/ui/popover'

export default function ContactoPage() {
  const Map = useMemo(
    () =>
      dynamic(
        () => {
          return Promise.all([
            import('react-leaflet'),
            import('leaflet'),
          ]).then(([{ MapContainer, TileLayer, Marker, Popup }, leaflet]) => {
            const TopografiaIcon = new leaflet.Icon({
              iconUrl:
                'https://www.ricardosanjur.com/wp-content/uploads/2025/02/logo-sin-fondopng-con-www.png',
              iconSize: [38, 30],
            })

            const DynamicMap = () => (
              <MapContainer
                center={[8.42709, -82.429592]}
                zoom={14}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[8.42709, -82.429592]} icon={TopografiaIcon}>
                  <Popup>Topografía Especializada S.A.</Popup>
                </Marker>
              </MapContainer>
            )

            DynamicMap.displayName = 'DynamicMap'
            return DynamicMap
          })
        },
        { ssr: false, loading: () => <p>Cargando mapa...</p> }
      ),
    []
  )

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Ha sido copiado al portapapeles')
  }

  return (
    <div className="flex flex-col items-center grid-rows-3 w-full gap-4 lg:h-screen justify-center">
      <section className="w-[80%] h-[30rem] rounded-2xl overflow-hidden">
        <Map />
      </section>
      <section className="w-[80%] h-[10rem]">
        <ul className="flex gap-4 items-center justify-center">
          <a href="https://www.instagram.com/medallassanjur/" target="_blank">
            <InstagramIcon className="w-10 h-10" />
          </a>
          <Popover>
            <PopoverTrigger>
              <WhatsappIcon className="w-10 h-10 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent
              className="w-fit text-center text-blue-500 hover:underline cursor-pointer"
              onClick={() => copyToClipboard('+507 6676-9050')}
            >
              +507 6676-9050
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>
              <GmailIcon className="w-10 h-10 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent
              className="w-fit text-center text-blue-500 hover:underline cursor-pointer"
              onClick={() => copyToClipboard('cotizacion@ricardosanjur.com')}
            >
              cotizacion@ricardosanjur.com
            </PopoverContent>
          </Popover>
        </ul>
      </section>
    </div>
  )
}
