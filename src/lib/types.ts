import { z } from "zod";

export const TimestampSchema = z.string();

export const MatchSchema = z.object({
  we_met: z
    .object({
      timestamp: TimestampSchema,
      did_meet_subject: z.enum(["Yes", "No"]).or(z.string()),
      was_my_type: z.boolean(),
    })
    .array()
    .optional(),

  like: z
    .object({
      timestamp: TimestampSchema,

      // A user can like a profile multiple times, e.g. when doing a fresh start
      like: z
        .object({
          timestamp: TimestampSchema,
          comment: z.string().optional(),
        })
        .array()
        .optional(),
    })
    .array()
    .optional(),

  match: z
    .object({
      timestamp: TimestampSchema,
    })
    .array()
    .optional(),

  chats: z
    .object({
      timestamp: TimestampSchema,
      body: z.string(),
    })
    .array()
    .optional(),

  block: z
    .object({
      block_type: z.enum(["remove"]).or(z.string()),
      timestamp: TimestampSchema,
    })
    .array()
    .optional(),
});

export const MediaSchema = z.object({
  type: z.enum(["photo", "video"]).or(z.string()),
  url: z.string(),
  prompt: z.string().optional(),
  from_social_media: z.boolean(),
});

export const PromptSchema = z.object({
  id: z.number(),
  prompt: z.string(),
  type: z.enum(["text"]).or(z.string()),
  text: z.string().optional(),
  user_updated: TimestampSchema.optional(),
  created: TimestampSchema,
});

const PreferencesSchema = z.object({
  distance_miles_max: z.number(),
  age_min: z.number(),
  age_max: z.number(),
  age_dealbreaker: z.boolean(),
  height_min: z.number(),
  height_max: z.number(),
  height_dealbreaker: z.boolean(),
  gender_preference: z.string(),
  ethnicity_preference: z.string(),
  ethnicity_dealbreaker: z.boolean(),
  religion_preference: z.string(),
  religion_dealbreaker: z.boolean(),
  smoking_preference: z.string(),
  smoking_dealbreaker: z.boolean(),
  drinking_preference: z.string(),
  drinking_dealbreaker: z.boolean(),
  marijuana_preference: z.string(),
  marijuana_dealbreaker: z.boolean(),
  drugs_preference: z.string(),
  drugs_dealbreaker: z.boolean(),
  children_preference: z.string(),
  children_dealbreaker: z.boolean(),
  family_plans_preference: z.string(),
  family_plans_dealbreaker: z.boolean(),
  education_attained_preference: z.string(),
  education_attained_dealbreaker: z.boolean(),
  politics_preference: z.string(),
  politics_dealbreaker: z.boolean(),
});

const IdentitySchema = z.object({
  email: z.string().email().optional(),
  instagram_authorized: z.boolean().optional(),
  phone_number: z.string().optional(),
  phone_country_code: z.string().optional(),
  phone_country_calling_code: z.string().optional(),
  phone_carrier: z.string().optional(),
  phone_line_type: z.string().optional(),
  phone_is_prepaid: z.boolean().optional(),
});

const InstallSchema = z.object({
  ip_address: z.string().ip(),
  idfv: z.string(),
  user_agent: z.string(),
  install_time: TimestampSchema,
});

const AccountSchema = z.object({
  signup_time: TimestampSchema,
  last_seen: TimestampSchema,
  device_platform: z.string().optional(),
  device_os: z.string().optional(),
  device_model: z.string().optional(),
  app_version: z.string().optional(),
  push_notifications_enabled: z.boolean().optional(),
});

const ProfileSchema = z.object({
  first_name: z.string(),
  age: z.number(),
  height_centimeters: z.number().optional(),
  gender: z.string().optional(),
  gender_identity: z.string().optional(),
  gender_identity_displayed: z.boolean().optional(),
  ethnicities: z.string().optional(),
  ethnicities_displayed: z.boolean().optional(),
  religions: z.string().optional(),
  religions_displayed: z.boolean().optional(),
  workplaces_displayed: z.boolean().optional(),
  job_title: z.string().optional(),
  job_title_displayed: z.boolean().optional(),
  schools: z.string().optional(),
  schools_displayed: z.boolean().optional(),
  hometowns: z.string().optional(),
  hometowns_displayed: z.boolean().optional(),
  smoking: z.string().optional(),
  smoking_displayed: z.boolean().optional(),
  drinking: z.string().optional(),
  drinking_displayed: z.boolean().optional(),
  marijuana: z.string().optional(),
  marijuana_displayed: z.boolean().optional(),
  drugs: z.string().optional(),
  drugs_displayed: z.boolean().optional(),
  children: z.string().optional(),
  children_displayed: z.boolean().optional(),
  family_plans: z.string().optional(),
  family_plans_displayed: z.boolean().optional(),
  education_attained: z.string().optional(),
  politics: z.string().optional(),
  politics_displayed: z.boolean().optional(),
  instagram_displayed: z.boolean().optional(),
  vaccination_status: z.string().optional(),
  vaccination_status_displayed: z.boolean().optional(),
  languages_spoken_displayed: z.boolean().optional(),
  languages_spoken: z.string().optional(),
  relationship_type_displayed: z.boolean().optional(),
  relationship_types: z.string().optional(),
  selfie_verified: z.boolean().optional(),
});

const DeviceSchema = z.object({
  ip_address: z.string().ip(),
  device_model: z.string(),
  device_platform: z.string(),
  device_os_versions: z.string(),
});

const LocationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  country: z.string(),
  country_short: z.string(),
  admin_area_1: z.string(),
  admin_area_1_short: z.string(),
  locality: z.string(),
  sublocality: z.string(),
  neighborhood: z.string(),
  postal_code: z.string(),
  location_source: z.string(),
});

const HingeProfileSchema = z.object({
  preferences: PreferencesSchema,
  identity: IdentitySchema,
  installs: z.array(InstallSchema),
  account: AccountSchema,
  profile: ProfileSchema,
  devices: z.array(DeviceSchema),
  location: LocationSchema.optional(),
});

export const HingeDataSchema = z.object({
  matches: MatchSchema.array(),
  media: MediaSchema.array(),
  prompts: PromptSchema.array(),
  user: HingeProfileSchema,
});

export type HingeData = z.infer<typeof HingeDataSchema>;
export type Match = z.infer<typeof MatchSchema>;
export type Media = z.infer<typeof MediaSchema>;
export type Prompt = z.infer<typeof PromptSchema>;
export type Preferences = z.infer<typeof PreferencesSchema>;
export type Identity = z.infer<typeof IdentitySchema>;
export type Install = z.infer<typeof InstallSchema>;
export type Account = z.infer<typeof AccountSchema>;
export type Profile = z.infer<typeof ProfileSchema>;
export type Device = z.infer<typeof DeviceSchema>;
export type Location = z.infer<typeof LocationSchema>;
export type HingeProfile = z.infer<typeof HingeProfileSchema>;
