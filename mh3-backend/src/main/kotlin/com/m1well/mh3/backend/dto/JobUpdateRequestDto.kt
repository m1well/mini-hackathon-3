package com.m1well.mh3.backend.dto

data class JobUpdateRequestDto(
    val uniqueKey: String,
    val urlJob: String?,
    val urlCompany: String?,
    val urlCompanyLogo: String?,
    val urlKununu: String?,
    val urlLinkedin: String?,
)
