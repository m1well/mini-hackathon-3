package com.m1well.mh3.backend.db

import org.springframework.data.jpa.repository.JpaRepository

interface JobRepo : JpaRepository<JobEntity, Long> {
    fun findByUniqueKey(uniqueKey: String): JobEntity?
    fun findAllByUserCode(userCode: String): List<JobEntity>
}
