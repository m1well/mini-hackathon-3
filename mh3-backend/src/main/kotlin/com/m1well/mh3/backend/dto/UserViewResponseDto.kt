package com.m1well.mh3.backend.dto

data class UserViewResponseDto(
    val uniqueCode: String,
    val firstName: String,
    val currentJobTitle: String,
    val experienceYears: Int,
    val preferences: String,
    val techstack: MutableList<String>?,
)
