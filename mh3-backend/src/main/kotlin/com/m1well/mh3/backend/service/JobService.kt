package com.m1well.mh3.backend.service

import com.m1well.mh3.backend.db.JobRepo
import com.m1well.mh3.backend.dto.JobSaveRequestDto
import com.m1well.mh3.backend.dto.JobUpdateRequestDto
import com.m1well.mh3.backend.dto.JobViewResponseDto
import com.m1well.mh3.backend.exception.ForbiddenException
import com.m1well.mh3.backend.exception.JobNotFoundException
import com.m1well.mh3.backend.mapping.Mapper
import io.github.oshai.kotlinlogging.KotlinLogging
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service

private val logger = KotlinLogging.logger {}

@Service
class JobService(private val repo: JobRepo, private val userService: UserService) {

    fun getAllJobsForUser(userCode: String): List<JobViewResponseDto> {
        val userExist = userService.getUserForCode(userCode)
        return repo.findAllByUserCode(userCode).map { Mapper.toDto(it) }
    }

    fun saveJob(userCode: String, request: JobSaveRequestDto): JobViewResponseDto {
        val userExist = userService.getUserForCode(userCode)
        val saved = repo.save(Mapper.toNewEntity(userCode, request))
        return Mapper.toDto(saved)
    }

    @Transactional
    fun updateJob(userCode: String, request: JobUpdateRequestDto): JobViewResponseDto {
        val userExist = userService.getUserForCode(userCode)
        val job = repo.findByUniqueKey(request.uniqueKey)?.let { Mapper.toUpdateEntity(request, it) }
            ?: throw JobNotFoundException("Job with unique key ${request.uniqueKey} not found!")
                .also { logger.error { "Job with unique key ${request.uniqueKey} not found!" } }

        if (job.userCode != userCode) {
            throw ForbiddenException("You are not allowed to change this job!")
                .also { logger.error { "You are not allowed to change this job!" } }
        }

        val updated = job.let { repo.save(it) }
        return Mapper.toDto(updated)
    }

}
