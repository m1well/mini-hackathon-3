package com.m1well.mh3.backend.service

import com.m1well.mh3.backend.db.UserRepo
import com.m1well.mh3.backend.dto.UserSaveRequestDto
import com.m1well.mh3.backend.dto.UserUpdateRequestDto
import com.m1well.mh3.backend.dto.UserViewResponseDto
import com.m1well.mh3.backend.exception.UserNotFoundException
import com.m1well.mh3.backend.mapping.Mapper
import io.github.oshai.kotlinlogging.KotlinLogging
import org.springframework.stereotype.Service
import java.security.SecureRandom

private val logger = KotlinLogging.logger {}

@Service
class UserService(private val repo: UserRepo) {

    val secureRandom = SecureRandom()

    fun getUserForCode(uniqueCode: String) = userFromRepo(uniqueCode).let { Mapper.toDto(it) }


    fun createUser(dto: UserSaveRequestDto): UserViewResponseDto {
        val saved = repo.save(Mapper.toNewEntity(dto, generateRandomUniqueCode()))
        return Mapper.toDto(saved)
    }

    fun updateUser(uniqueCode: String, dto: UserUpdateRequestDto): UserViewResponseDto {
        val fromDb = userFromRepo(uniqueCode)
        val updated = repo.save(Mapper.toUpdateEntity(dto, fromDb))
        return Mapper.toDto(updated)
    }

    fun userFromRepo(uniqueCode: String) = repo.findByUniqueCode(uniqueCode)
        ?: throw UserNotFoundException("User for unique code $uniqueCode not found!")
            .also { logger.error { "User for unique code $uniqueCode not found!" } }

    fun generateRandomUniqueCode(): String {
        val charPool = "ABCDEFGHJKLMNPRSTUVWXYZabcdefghjklmnpqrstuvwxyz123456789"
        val length = 9

        val sb = StringBuilder(length)
        repeat(length) {
            val randomIndex = secureRandom.nextInt(charPool.length)
            sb.append(charPool[randomIndex])
        }
        logger.info { "Created new random unique code $sb" }
        return sb.toString()
    }

}
