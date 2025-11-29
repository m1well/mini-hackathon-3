package com.m1well.mh3.backend.service

import com.m1well.mh3.backend.dto.UtilDto
import org.springframework.boot.info.BuildProperties
import org.springframework.stereotype.Service
import java.time.LocalDate
import java.time.ZoneId

@Service
class UtilService(private val props: BuildProperties) {

    fun provideInfo(): UtilDto =
        UtilDto(props.version.toString(), LocalDate.ofInstant(props.time, ZoneId.systemDefault()), detectEnvironment())

    private fun detectEnvironment(): String {
        if (System.getenv("STAGE") == "prod") {
            return "PROD"
        } else if (System.getenv("STAGE") == "dev") {
            return "DEV"
        }
        return "LOCAL"
    }

}
