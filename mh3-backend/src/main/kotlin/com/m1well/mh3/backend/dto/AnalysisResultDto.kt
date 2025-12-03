package com.m1well.mh3.backend.dto

data class AnalysisResultDto(
    val uniqueKey: String,
    val title: String,
    val company: String,
    val location: String,
    val summary: String,
    val techstack: List<String>,
    val tasks: String,
    val workingModel: String,
    val experience: String,
    val benefits: String,
    val culture: String,
    val salaryRange: String?,
    val matchScore: Int,
    val matchReasoning: String,
)
