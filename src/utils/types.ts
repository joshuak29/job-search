export interface Job {
	id: Number,
	title: String,
	organization: String,
	degree: String,
	jobType: String,
	locations: String[],
	minimumQualifications: String[],
	preferredQualifications: String[],
	description: String[],
	dateAdded: String
} 