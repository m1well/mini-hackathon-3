package com.m1well.mh3.backend.db

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "user")
class UserEntity(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false)
    val created: LocalDateTime? = LocalDateTime.now(),

    @Column(unique = true, nullable = false)
    val uniqueCode: String,

    @Column(nullable = false)
    val firstName: String,

    var currentJobTitle: String,
    var experienceYears: Int,
    var preferences: String,

    @ElementCollection @CollectionTable(
        name = "user_techstack",
        joinColumns = [JoinColumn(name = "user_id")]
    ) @Column(name = "value") @OrderBy("value ASC")
    var techstack: MutableList<String>?

)
