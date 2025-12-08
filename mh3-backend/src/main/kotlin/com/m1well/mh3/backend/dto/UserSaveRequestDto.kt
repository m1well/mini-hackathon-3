package com.m1well.mh3.backend.dto

data class UserSaveRequestDto(
    val firstName: String,
    val currentJobTitle: String,
    val experienceYears: Int,
    val preferences: String,
    val techstack: MutableList<String>?,
)
