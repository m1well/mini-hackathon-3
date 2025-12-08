package com.m1well.mh3.backend.service

import com.m1well.mh3.backend.db.JobEntity
import com.m1well.mh3.backend.db.JobRepo
import com.m1well.mh3.backend.db.TimelineEntity
import com.m1well.mh3.backend.dto.JobSaveRequestDto
import com.m1well.mh3.backend.dto.JobUpdateRequestDto
import com.m1well.mh3.backend.dto.JobViewResponseDto
import com.m1well.mh3.backend.exception.ForbiddenException
import com.m1well.mh3.backend.exception.JobNotFoundException
import com.m1well.mh3.backend.mapping.Mapper
import io.github.oshai.kotlinlogging.KotlinLogging
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service
import java.time.LocalDateTime

private val logger = KotlinLogging.logger {}

@Service
class JobService(private val repo: JobRepo, private val userService: UserService) {

    fun getAllJobsForUser(userCode: String): List<JobViewResponseDto> {
        val userExist = userService.getUserForCode(userCode)
        return repo.findAllByUserCode(userCode)
            .sortedWith(
                compareBy<JobEntity> { getStatusRank(it.status) }
                    .thenByDescending { it.created }
            )
            .map { Mapper.toDto(it) }
    }

    fun saveJob(userCode: String, dto: JobSaveRequestDto): JobViewResponseDto {
        val userExist = userService.getUserForCode(userCode)
        val saved = repo.save(Mapper.toNewEntity(userCode, dto))
        return Mapper.toDto(saved)
    }

    @Transactional
    fun updateJob(userCode: String, dto: JobUpdateRequestDto): JobViewResponseDto {
        val userExist = userService.getUserForCode(userCode)
        val job = repo.findByUniqueKey(dto.uniqueKey)
            ?: throw JobNotFoundException("Job with unique key ${dto.uniqueKey} not found!")
                .also { logger.error { "Job with unique key ${dto.uniqueKey} not found!" } }

        if (job.userCode != userCode) {
            throw ForbiddenException("You are not allowed to change this job!")
                .also { logger.error { "You are not allowed to change this job!" } }
        }

        if (job.status != dto.status) {
            job.timeline?.add(
                TimelineEntity(
                    status = dto.status,
                    changedAt = LocalDateTime.now(),
                )
            )
        }
        val updated = Mapper.toUpdateEntity(dto, job).let { repo.save(it) }
        return Mapper.toDto(updated)
    }

    private fun getStatusRank(status: String): Int {
        return when (status) {
            "Zusage" -> 1
            "Beworben" -> 2
            "Warten" -> 3
            "Neu" -> 4
            "Absage" -> 99
            else -> 5 // all others on top of "Absage"
        }
    }

}
