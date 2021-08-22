import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountApi } from '../../../../api/base';

import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { UserinfoService } from '../../services/userinfo.service';

@Component({
    selector: 'app-page-profile',
    templateUrl: './page-profile.component.html',
    styleUrls: ['./page-profile.component.scss'],
})
export class PageProfileComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    form: FormGroup;
    saveInProgress = false;

    constructor(
        private account: AccountApi,
        private fb: FormBuilder,
        private toastr: ToastrService,
        private translate: TranslateService,
        private userinfo: UserinfoService
    ) { }

    ngOnInit(): void {
       this.userinfo.getUserDetails(this.account.user.email).subscribe(
           data => {
               const { firstName, lastName, phoneNumber } = data;
               this.form = this.fb.group({
                firstName: [firstName, [Validators.required]],
                lastName: [lastName, [Validators.required]],
                email: [this.account.user.email, [Validators.required, Validators.email]],
                phone: [phoneNumber, [Validators.required]],
            });
           }
       );
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    save(): void {
        this.form.markAllAsTouched();

        if (this.saveInProgress || this.form.invalid){
            return;
        }

        this.saveInProgress = true;
        this.account.editProfile(this.form.value).pipe(
            finalize(() => this.saveInProgress = false),
            takeUntil(this.destroy$),
        ).subscribe(() => {
            this.toastr.success(this.translate.instant('TEXT_TOAST_PROFILE_SAVED'));
        });
    }
}
