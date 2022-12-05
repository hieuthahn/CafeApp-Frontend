import React from 'react'
import ExploreCard from 'components/ExploreCard'

const Explore = () => {
    return (
        <div className="relative">
            <div className="h-[200px] bg-[linear-gradient(180deg,#ffb8b8,#f3f4f6)]"></div>
            <div className="container mx-auto">
                <div className='grid grid-cols-3 gap-4'>
                    <div className='col-span-2'>
                        <ExploreCard />
                    </div>
                    <div className='text-center'>sidebar</div>
                </div>
            </div>
        </div>
    )
}

export default Explore
