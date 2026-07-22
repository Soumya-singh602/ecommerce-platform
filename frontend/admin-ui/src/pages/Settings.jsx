import DashboardLayout from "../layouts/DashboardLayout";

import SettingsHeader from "../components/settings/SettingsHeader";
import ProfileSettings from "../components/settings/ProfileSettings";
import PasswordSettings from "../components/settings/PasswordSettings";
import StoreSettings from "../components/settings/StoreSettings";

export default function Settings() {

    return (

        <DashboardLayout>

            <SettingsHeader />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <ProfileSettings />

                <PasswordSettings />

            </div>

            <div className="mt-6">

                <StoreSettings />

            </div>

        </DashboardLayout>

    );

}