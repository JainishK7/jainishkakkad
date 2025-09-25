package com.edutracker.approval;

import com.edutracker.activity.Activity;
import com.edutracker.activity.ActivityRepository;
import com.edutracker.activity.ActivityStatus;
import com.edutracker.user.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/approvals")
public class ApprovalController {

    private final ApprovalRepository approvals;
    private final ActivityRepository activities;
    private final UserRepository users;

    public ApprovalController(ApprovalRepository approvals, ActivityRepository activities, UserRepository users) {
        this.approvals = approvals; this.activities = activities; this.users = users;
    }

    public record ActionRequest(Long activityId, Long approverUserId, boolean approve, String comment) {}

    @PostMapping("/act")
    @PreAuthorize("hasAnyRole('FACULTY','VALIDATOR','SUB_ADMIN','SUPER_ADMIN')")
    public ResponseEntity<Approval> act(@RequestBody ActionRequest req) {
        Activity a = activities.findById(req.activityId()).orElseThrow();
        var approver = users.findById(req.approverUserId()).orElseThrow();
        var appr = new Approval();
        appr.setActivity(a); appr.setApprover(approver);
        appr.setApproved(req.approve()); appr.setComment(req.comment());
        approvals.save(appr);
        a.setStatus(req.approve() ? ActivityStatus.APPROVED : ActivityStatus.CHANGES_REQUESTED);
        activities.save(a);
        return ResponseEntity.ok(appr);
    }
}
