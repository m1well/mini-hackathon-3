package com.m1well.mh3.backend.db

import jakarta.persistence.Embeddable
import java.time.LocalDateTime

@Embeddable
data class TimelineEntity(
    val status: String = "Neu",
    val changedAt: LocalDateTime = LocalDateTime.now(),
)
