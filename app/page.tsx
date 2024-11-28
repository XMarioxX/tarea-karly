import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardTitle } from '@/components/ui/card'

const Home = () => {
  return (
    <div className="flex flex-col items-center gap-6 p-6 min-h-screen">
      <Link href="/">
        <Card className="w-80 rounded-lg shadow-lg transform transition-transform hover:scale-105">
          <CardContent className="p-6">
            <CardTitle className="text-xl font-bold">Orden superior 1</CardTitle>
          </CardContent>
        </Card>
      </Link>
      <Link href="/orden-superior-2">
        <Card className="w-80 rounded-lg shadow-lg transform transition-transform hover:scale-105">
          <CardContent className="p-6">
            <CardTitle className="text-xl font-bold">Orden superior 2</CardTitle>
          </CardContent>
        </Card>
      </Link>
      <Link href="/CAUCHY-EULER">
        <Card className="w-80 rounded-lg shadow-lg transform transition-transform hover:scale-105">
          <CardContent className="p-6">
            <CardTitle className="text-xl font-bold">Cauchy-Euler</CardTitle>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}

export default Home