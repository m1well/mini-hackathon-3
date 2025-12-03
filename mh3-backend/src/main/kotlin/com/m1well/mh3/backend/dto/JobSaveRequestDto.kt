package com.m1well.mh3.backend.dto

data class JobSaveRequestDto(
    val uniqueKey: String,
    val title: String,
    val company: String,
    val analyzedViaUrl: Boolean,
    val location: String?,
    val summary: String,
    val techstack: MutableList<String>?,
    val tasks: String,
    val workingModel: String,
    val experience: String,
    val benefits: String,
    val culture: String,
    val salaryRange: String?,
    val matchScore: Int,
    val matchReasoning: String,
    val urlJob: String?,
    val urlCompany: String?,
    val urlCompanyLogo: String?,
    val urlKununu: String?,
    val urlLinkedin: String?,
)
