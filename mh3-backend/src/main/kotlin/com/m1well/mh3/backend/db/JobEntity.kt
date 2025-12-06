package com.m1well.mh3.backend.db

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "job")
class JobEntity(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false)
    val created: LocalDateTime? = LocalDateTime.now(),

    @Column(unique = true, nullable = false)
    val uniqueKey: String,

    @Column(nullable = false)
    val userCode: String,

    @Column(nullable = false)
    val title: String,

    @Column(nullable = false)
    val company: String,

    @Column(nullable = false)
    val analyzedViaUrl: Boolean,

    @Column(nullable = false)
    var status: String,

    val location: String?,
    val summary: String,
    val tasks: String,
    val workingModel: String,
    val experience: String,
    val benefits: String,
    val culture: String,
    val salaryRange: String?,
    val matchScore: Int,
    val matchReasoning: String,
    var urlJob: String?,
    var urlCompany: String?,
    var urlCompanyLogo: String?,
    var urlKununu: String?,
    var urlLinkedin: String?,
    var comment: String?,

    @ElementCollection @CollectionTable(
        name = "job_techstack",
        joinColumns = [JoinColumn(name = "job_id")]
    ) @Column(name = "value") @OrderBy("value ASC")
    val techstack: MutableList<String>?

)
