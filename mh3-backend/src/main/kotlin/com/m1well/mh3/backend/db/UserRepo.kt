package com.m1well.mh3.backend.db

import org.springframework.data.jpa.repository.JpaRepository

interface UserRepo : JpaRepository<UserEntity, Long> {
    fun findByUniqueCode(uniqueCode: String): UserEntity?
}
