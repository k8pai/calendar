'use client'

import Footer from '@/app/clock/Footer'
import Header from '@/app/clock/Header'
import Clock from '@/components/clock/Clock'

const page = () => {
    return (
        <div className="min-h-screen p-6 h-full flex flex-col">
            <Header />
            <div className="flex-1 flex flex-col">
                <Clock />
            </div>
            <Footer />
        </div>
    )
}

export default page
