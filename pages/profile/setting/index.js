import React from "react"
import Sidebar from "components/Profile/Setting/Sidebar"
import Info from "components/Profile/Setting/Info"

const ProfileSetting = () => {
    return (
        <div className="container mx-auto p-4 grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-4">
                <Sidebar />
            </div>
            <div className="col-span-12 md:col-span-8">
                <Info />
            </div>
        </div>
    )
}

export default ProfileSetting
