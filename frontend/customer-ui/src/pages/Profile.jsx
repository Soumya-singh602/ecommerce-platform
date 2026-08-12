import { useEffect, useState } from "react";
import { User, Mail, ShieldCheck, Save, Loader2 } from "lucide-react";

import { getProfile, updateProfile } from "../services/userService";
import MainLayout from "../layouts/MainLayout";

export default function Profile() {
  const [profile, setProfile] = useState(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
  });

  const [saving, setSaving] = useState(false);

  // ==========================
  // FETCH PROFILE
  // ==========================

  const fetchProfile = async () => {
    try {
      const response = await getProfile();

      const user = response.data;

      setProfile(user);

      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
      });
    } catch (error) {
      console.log("PROFILE FETCH ERROR:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ==========================
  // INPUT CHANGE
  // ==========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // UPDATE PROFILE
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateProfile(formData);

      alert("Profile updated successfully");

      fetchProfile();
    } catch (error) {
      console.log("PROFILE UPDATE ERROR:", error);
      alert("Unable to update profile");
    } finally {
      setSaving(false);
    }
  };

  // ==========================
  // LOADING
  // ==========================

  if (!profile) {
    return (
      <MainLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <Loader2
              size={32}
              className="animate-spin text-blue-600 mx-auto"
            />

            <p className="mt-3 text-gray-500">
              Loading profile...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // ==========================
  // PROFILE INITIAL
  // ==========================

  const firstName =
    profile.first_name?.trim() || "";

  const lastName =
    profile.last_name?.trim() || "";

  const initials =
    `${firstName.charAt(0)}${lastName.charAt(0)}`
      .toUpperCase() || "U";

  return (
    <MainLayout>
      <div className="bg-slate-50 min-h-[calc(100vh-80px)] py-10">
        <div className="max-w-6xl mx-auto px-4">

          {/* ==========================
              PAGE HEADER
          ========================== */}

          <div className="mb-8">
            <p className="text-sm text-blue-600 font-semibold uppercase tracking-wider">
              Account
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              My Profile
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your personal information and account details.
            </p>
          </div>

          {/* ==========================
              PROFILE LAYOUT
          ========================== */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ==========================
                LEFT PROFILE CARD
            ========================== */}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

              <div className="h-28 bg-gradient-to-r from-blue-600 to-indigo-600" />

              <div className="px-6 pb-6">

                {/* Avatar */}

                <div className="-mt-12 mb-5">
                  <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg">
                    <div className="w-full h-full rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-3xl font-bold">
                      {initials}
                    </div>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-gray-900">
                  {firstName || lastName
                    ? `${firstName} ${lastName}`.trim()
                    : "User"}
                </h2>

                <p className="text-gray-500 text-sm mt-1 break-all">
                  {profile.email}
                </p>

                {/* Role */}

                <div className="mt-6 pt-5 border-t border-gray-100">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <ShieldCheck size={20} />
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">
                        Account Role
                      </p>

                      <p className="font-semibold text-gray-800 capitalize">
                        {profile.role || "Customer"}
                      </p>
                    </div>

                  </div>

                </div>

                {/* Email */}

                <div className="mt-5">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center">
                      <Mail size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-gray-400 uppercase tracking-wide">
                        Email
                      </p>

                      <p className="font-medium text-gray-700 text-sm truncate">
                        {profile.email}
                      </p>
                    </div>

                  </div>

                </div>

              </div>
            </div>

            {/* ==========================
                RIGHT EDIT PROFILE
            ========================== */}

            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">

              <div className="p-6 md:p-8">

                <div className="flex items-center gap-3 pb-6 border-b border-gray-100">

                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <User size={21} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Personal Information
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Update your name and account information.
                    </p>
                  </div>

                </div>

                <form
                  onSubmit={handleSubmit}
                  className="mt-7 space-y-6"
                >

                  {/* Name */}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        First Name
                      </label>

                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder="Enter first name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Last Name
                      </label>

                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>

                  </div>

                  {/* Email */}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>

                    <div className="relative">

                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="email"
                        value={profile.email || ""}
                        disabled
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
                      />

                    </div>

                    <p className="text-xs text-gray-400 mt-2">
                      Email address cannot be changed.
                    </p>
                  </div>

                  {/* Role */}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Account Role
                    </label>

                    <input
                      value={profile.role || "Customer"}
                      disabled
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed capitalize"
                    />
                  </div>

                  {/* Save */}

                  <div className="pt-4 border-t border-gray-100 flex justify-end">

                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-7 py-3 rounded-xl font-semibold hover:bg-blue-700 active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {saving ? (
                        <>
                          <Loader2
                            size={18}
                            className="animate-spin"
                          />

                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={18} />

                          Save Changes
                        </>
                      )}
                    </button>

                  </div>

                </form>

              </div>

            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}