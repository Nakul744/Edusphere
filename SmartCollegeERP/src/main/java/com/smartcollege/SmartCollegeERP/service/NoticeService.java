package com.smartcollege.SmartCollegeERP.service;

import com.smartcollege.SmartCollegeERP.model.Notice;
import com.smartcollege.SmartCollegeERP.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;

    public Notice createNotice(Notice notice, String adminEmail){

        notice.setCreatedBy(adminEmail);

        notice.setCreatedAt(LocalDateTime.now());

        return noticeRepository.save(notice);
    }

    // Get all notices
    public List<Notice> getAllNotices(){

        return noticeRepository.findAllByOrderByCreatedAtDesc();

    }
    // Get notices for course
    public List<Notice> getCourseNotices(String courseId){
        return noticeRepository.findByCourseId(courseId);
    }


    public void deleteNotice(String noticeId){

        noticeRepository.deleteById(noticeId);

    }
}