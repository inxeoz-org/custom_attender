// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

import { z } from "zod";

// ========== ZOD SCHEMAS ========== //

// Authentication Schemas
export const LoginCheckRequestSchema = z.object({
	phone: z.string(),
});

export const LoginCheckResponseSchema = z.object({
	message: z.string(), // otp
});

export const VerifyOtpLoginRequestSchema = z.object({
	phone: z.string(),
	otp: z.string(),
});

export const VerifyOtpLoginResponseSchema = z.object({
	message: z.string(), // token
});

// Profile Schemas
export const AttenderProfileSchema = z.object({
	attender_name: z.string(),
	gender: z.string(),
	dob: z.string(),
	aadhar: z.string(),
	location: z.string(),
	phone: z.string().optional(),
	email: z.string().optional(),
});

export const GetProfileResponseSchema = z.object({
	message: z.object({
		profile: AttenderProfileSchema,
	}),
});

export const UpdateProfileRequestSchema = z.object({
	attender_name: z.string(),
	gender: z.string(),
	dob: z.string(),
	aadhar: z.string(),
	location: z.string(),
});

export const UpdateProfileResponseSchema = z.object({
	message: z.string(),
});

// Credential Update Schemas
export const RequestUpdatePhoneRequestSchema = z.object({
	phone: z.string(),
});

export const RequestUpdatePhoneResponseSchema = z.object({
	message: z.string(), // otp_phone
});

export const UpdatePhoneRequestSchema = z.object({
	phone: z.string(),
	otp_phone: z.string(),
});

export const UpdatePhoneResponseSchema = z.object({
	message: z.string(),
});

export const RequestUpdateEmailRequestSchema = z.object({
	email: z.string(),
});

export const RequestUpdateEmailResponseSchema = z.object({
	message: z.string(), // otp_email
});

export const UpdateEmailRequestSchema = z.object({
	email: z.string(),
	otp_email: z.string(),
});

export const UpdateEmailResponseSchema = z.object({
	message: z.string(),
});

// Appointment Schemas
export const GetAttenderAppointmentsListRequestSchema = z.object({
	appointment_date: z.string().nullable().optional(),
});

export const AppointmentSchema = z.object({
	appointment_id: z.string(),
	// Add other fields as needed
});

export const GetAttenderAppointmentsListResponseSchema = z.object({
	message: z.array(AppointmentSchema),
});

export const GetAttenderAppointmentRequestSchema = z.object({
	appointment_id: z.string(),
});

export const GetAttenderAppointmentResponseSchema = z.object({
	message: AppointmentSchema,
});

export const GetAppointmentStatsResponseSchema = z.object({
	message: z.object({
		assigned: z.number(),
		exit: z.number(),
		attended: z.number(),
	}),
});

export const MarkExitRequestSchema = z.object({
	appointment_id: z.string(),
});

export const MarkExitResponseSchema = z.object({
	message: z.string(),
});

export const GetAttenderAppointmentCompanionListRequestSchema = z.object({
	appointment_id: z.string(),
});

export const CompanionSchema = z.object({
	name: z.string(),
	gender: z.string(),
	age: z.number(),
});

export const GetAttenderAppointmentCompanionListResponseSchema = z.object({
	message: z.array(CompanionSchema),
});

// Type exports
export type LoginCheckRequest = z.infer<typeof LoginCheckRequestSchema>;
export type LoginCheckResponse = z.infer<typeof LoginCheckResponseSchema>;
export type VerifyOtpLoginRequest = z.infer<typeof VerifyOtpLoginRequestSchema>;
export type VerifyOtpLoginResponse = z.infer<typeof VerifyOtpLoginResponseSchema>;
export type AttenderProfile = z.infer<typeof AttenderProfileSchema>;
export type GetProfileResponse = z.infer<typeof GetProfileResponseSchema>;
export type UpdateProfileRequest = z.infer<typeof UpdateProfileRequestSchema>;
export type UpdateProfileResponse = z.infer<typeof UpdateProfileResponseSchema>;
export type RequestUpdatePhoneRequest = z.infer<typeof RequestUpdatePhoneRequestSchema>;
export type RequestUpdatePhoneResponse = z.infer<typeof RequestUpdatePhoneResponseSchema>;
export type UpdatePhoneRequest = z.infer<typeof UpdatePhoneRequestSchema>;
export type UpdatePhoneResponse = z.infer<typeof UpdatePhoneResponseSchema>;
export type RequestUpdateEmailRequest = z.infer<typeof RequestUpdateEmailRequestSchema>;
export type RequestUpdateEmailResponse = z.infer<typeof RequestUpdateEmailResponseSchema>;
export type UpdateEmailRequest = z.infer<typeof UpdateEmailRequestSchema>;
export type UpdateEmailResponse = z.infer<typeof UpdateEmailResponseSchema>;
export type GetAttenderAppointmentsListRequest = z.infer<typeof GetAttenderAppointmentsListRequestSchema>;
export type Appointment = z.infer<typeof AppointmentSchema>;
export type GetAttenderAppointmentsListResponse = z.infer<typeof GetAttenderAppointmentsListResponseSchema>;
export type GetAttenderAppointmentRequest = z.infer<typeof GetAttenderAppointmentRequestSchema>;
export type GetAttenderAppointmentResponse = z.infer<typeof GetAttenderAppointmentResponseSchema>;
export type GetAppointmentStatsResponse = z.infer<typeof GetAppointmentStatsResponseSchema>;
export type MarkExitRequest = z.infer<typeof MarkExitRequestSchema>;
export type MarkExitResponse = z.infer<typeof MarkExitResponseSchema>;
export type GetAttenderAppointmentCompanionListRequest = z.infer<typeof GetAttenderAppointmentCompanionListRequestSchema>;
export type Companion = z.infer<typeof CompanionSchema>;
export type GetAttenderAppointmentCompanionListResponse = z.infer<typeof GetAttenderAppointmentCompanionListResponseSchema>;
