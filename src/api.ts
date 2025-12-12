import { API_BASE } from "$lib/env.js";

import { get } from "svelte/store";
import { auth_token, user_logged_in } from "@src/store.js";
import { goto } from "$app/navigation";
const ATTENDER = `${API_BASE}/api/method/custom_booking.custom_booking.doctype.attender.`;

// ========== API FUNCTIONS ========== //

// Authentication APIs

export async function loginCheck(phone: string) {
  try {
    const res = await fetch(ATTENDER + "attender.attender_login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    return await res.json();
  } catch (err: any) {
    console.error("loginCheck:", err);
    return null;
  }
}

export async function verifyOtpLogin(phone: string, otp: string) {
  try {
    const res = await fetch(ATTENDER + "attender.attender_login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, otp }),
    });
    const data = await res.json();
    if (data?.message) {
      auth_token.set(data.message);
      user_logged_in.set(true);
    }
    return data;
  } catch (err: any) {
    console.error("verifyOtpLogin:", err);
    return null;
  }
}

// Profile APIs
export async function getProfile() {
  try {
    const res = await fetch(ATTENDER + "profile.profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: get(auth_token),
      },
    });

    const data = await res.json();

    return data?.message?.profile;
  } catch (err: any) {
    console.error("get_self_profile:", err);
    return null;
  }
}

export async function updateProfile(profileData: {
  attender_name: string;
  gender: string;
  dob: string;
  aadhar: string;
  location: string;
}) {
  try {
    const res = await fetch(ATTENDER + "profile.update_profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: get(auth_token),
      },
      body: JSON.stringify(profileData),
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error("update_profile:", err);
    return null;
  }
}

// Credential Update APIs
export async function requestUpdatePhone(newPhone: string) {
  try {
    const res = await fetch(ATTENDER + "profile.update_cred", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: get(auth_token),
      },
      body: JSON.stringify({ phone: newPhone }),
    });
    return await res.json();
  } catch (err: any) {
    console.error("requestUpdatePhone:", err);
    return null;
  }
}

export async function updatePhone(newPhone: string, otpPhone: string) {
  try {
    const res = await fetch(ATTENDER + "profile.update_cred", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: get(auth_token),
      },
      body: JSON.stringify({ phone: newPhone, otp_phone: otpPhone }),
    });
    return await res.json();
  } catch (err: any) {
    console.error("updatePhone:", err);
    return null;
  }
}

export async function requestUpdateEmail(newEmail: string) {
  try {
    const res = await fetch(ATTENDER + "profile.update_cred", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: get(auth_token),
      },
      body: JSON.stringify({ email: newEmail }),
    });
    return await res.json();
  } catch (err: any) {
    console.error("requestUpdateEmail:", err);
    return null;
  }
}

export async function updateEmail(newEmail: string, otpEmail: string) {
  try {
    const res = await fetch(ATTENDER + "profile.update_cred", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: get(auth_token),
      },
      body: JSON.stringify({ email: newEmail, otp_email: otpEmail }),
    });
    return await res.json();
  } catch (err: any) {
    console.error("updateEmail:", err);
    return null;
  }
}

// Appointment APIs
export async function getAppointmentList(slot_date: string | null) {
  try {
    const res = await fetch(ATTENDER + "attender.get_appointment_list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: get(auth_token),
      },
      body: JSON.stringify({
        slot_date,
      }),
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error("get_attender_appointments_list:", err);
    return null;
  }
}

export async function getAppointment(appointment_id: string) {
  try {
    const res = await fetch(ATTENDER + "attender.get_appointment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: get(auth_token),
      },
      body: JSON.stringify({
        appointment_id: appointment_id,
      }),
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error("get_attender_appointment:", err);
    return null;
  }
}

export async function getAppointmentStats(slot_date: string | null) {
  try {
    const res = await fetch(ATTENDER + "attender.get_appointment_stats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: get(auth_token),
      },
      body: JSON.stringify({
        slot_date: slot_date,
      }),
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error("get_appointment_stats:", err);
    return null;
  }
}

export async function markExit(appointment_id: string) {
  try {
    const res = await fetch(ATTENDER + "attender.mark_exit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: get(auth_token),
      },
      body: JSON.stringify({
        appointment_id: appointment_id,
      }),
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error("mark_exit:", err);
    return null;
  }
}

export async function getAppointmentCompanion(appointment_id: string) {
  try {
    const res = await fetch(ATTENDER + "attender.get_appointment_companion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: get(auth_token),
      },
      body: JSON.stringify({
        appointment_id: appointment_id,
      }),
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error("get_attender_appointment_companion_list:", err);
    return null;
  }
}
