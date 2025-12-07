package com.m1well.mh3.backend.mapping

import com.m1well.mh3.backend.db.JobEntity
import com.m1well.mh3.backend.db.TimelineEntity
import com.m1well.mh3.backend.db.UserEntity
import com.m1well.mh3.backend.dto.*
import java.time.LocalDateTime

class Mapper {

    // TODO check usage of Mapstruct here

    companion object {
        fun toNewEntity(code: String, dto: UserSaveRequestDto) = UserEntity(
            uniqueCode = code,
            firstName = dto.firstName,
            currentJobTitle = dto.currentJobTitle,
            experienceYears = dto.experienceYears,
            preferences = dto.preferences,
            techstack = dto.techstack,
        )

        fun toNewEntity(userCode: String, dto: JobSaveRequestDto) = JobEntity(
            userCode = userCode,
            uniqueKey = dto.uniqueKey,
            title = dto.title,
            company = dto.company,
            analyzedViaUrl = dto.analyzedViaUrl,
            status = "Neu",
            location = dto.location,
            summary = dto.summary,
            techstack = dto.techstack,
            tasks = dto.tasks,
            workingModel = dto.workingModel,
            experience = dto.experience,
            benefits = dto.benefits,
            culture = dto.culture,
            salaryRange = dto.salaryRange,
            matchScore = dto.matchScore,
            matchReasoning = dto.matchReasoning,
            urlJob = dto.urlJob,
            urlCompany = null,
            urlCompanyLogo = null,
            urlKununu = null,
            urlLinkedin = null,
            comment = null,
            timeline = mutableListOf(TimelineEntity("Neu", LocalDateTime.now()))
        )

        fun toUpdateEntity(dto: UserUpdateRequestDto, existing: UserEntity): UserEntity {
            existing.currentJobTitle = dto.currentJobTitle
            existing.experienceYears = dto.experienceYears
            existing.preferences = dto.preferences
            existing.techstack = dto.techstack
            return existing
        }

        fun toUpdateEntity(dto: JobUpdateRequestDto, existing: JobEntity): JobEntity {
            existing.urlJob = dto.urlJob
            existing.status = dto.status
            existing.urlCompany = dto.urlCompany
            existing.urlCompanyLogo = dto.urlCompanyLogo
            existing.urlKununu = dto.urlKununu
            existing.urlLinkedin = dto.urlLinkedin
            existing.comment = dto.comment
            return existing
        }

        fun toDto(entity: UserEntity) = UserViewResponseDto(
            uniqueCode = entity.uniqueCode,
            firstName = entity.firstName,
            currentJobTitle = entity.currentJobTitle,
            experienceYears = entity.experienceYears,
            preferences = entity.preferences,
            techstack = entity.techstack?.sortedBy { it.lowercase() }?.toMutableList(),
        )

        fun toDto(entity: JobEntity) = JobViewResponseDto(
            uniqueKey = entity.uniqueKey,
            title = entity.title,
            company = entity.company,
            analyzedViaUrl = entity.analyzedViaUrl,
            status = entity.status,
            location = entity.location,
            summary = entity.summary,
            techstack = entity.techstack?.sortedBy { it.lowercase() }?.toMutableList(),
            tasks = entity.tasks,
            workingModel = entity.workingModel,
            experience = entity.experience,
            benefits = entity.benefits,
            culture = entity.culture,
            salaryRange = entity.salaryRange,
            matchScore = entity.matchScore,
            matchReasoning = entity.matchReasoning,
            urlJob = entity.urlJob,
            urlCompany = entity.urlCompany,
            urlCompanyLogo = entity.urlCompanyLogo,
            urlKununu = entity.urlKununu,
            urlLinkedin = entity.urlLinkedin,
            comment = entity.comment,
            timeline = entity.timeline?.map { toDto(it) }?.sortedBy { it.changedAt }?.reversed()?.toMutableList()
        )

        fun toDto(entity: TimelineEntity) = JobViewTimelineResponseDto(
            status = entity.status,
            changedAt = entity.changedAt,
        )
    }

}
