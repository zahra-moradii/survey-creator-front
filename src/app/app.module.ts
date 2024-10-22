// import { Select } from './shared/components/adminPanel/dialog';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SurveyCardComponent } from './shared/components/survey-card/survey-card.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  FormFieldPrefixSuffixExample,
  ErrorSnackbar,
  OkSnackbar,
} from './shared/components/login/login';
import {
  SelectReactiveFormExample,
  ErrorSnackbarSignup,
  OkSnackbarSignup,
} from './shared/components/SignUp/signup';
import {
  DialogContentExampleDialog,
  DialogContentExample,
} from './shared/components/forgetPass/dialog';
import { DialogContentDialog } from './shared/components/adminPanel/adminPanel';
import { MatDialogModule } from '@angular/material/dialog';
import { StepperEditableExample } from './shared/components/stepper/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import { PostService } from './services/post.service';
import { SidenavAutosizeExample } from './shared/components/sidebar/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthUser } from './shared/components/signUpIn/Auth';
import { Dashboard } from './shared/components/dashboard/dashboard';
import { AuthGuard } from './guard/auth.guard';
import { FormField } from './shared/components/FormField/formfield';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SuccessfullSurveyComponent } from './shared/components/successfull-survey/successfull-survey.component';
import { AllSurveysComponent } from './shared/components/all-surveys/all-surveys.component';
import { SuccessfullAnswerComponent } from './shared/components/successfull-answer/successfull-answer.component';
import { SurveyReadOnlyComponent } from './shared/components/survey-read-only/survey-read-only.component';
import { PackagesComponent } from './shared/components/packages/packages.component';
import { CreatePackageComponent } from './shared/components/create-package/create-package.component';
import { PackageManagerComponent } from './shared/components/package-manager/package-manager.component';
import { EditPackageComponent } from './shared/components/edit-package/edit-package.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DiscountManagerComponent } from './shared/components/discount-manager/discount-manager.component';
import { CreateDiscountComponent } from './shared/components/create-discount/create-discount.component';
import { changeinfo } from './shared/components/updateinfo/updateinfo';
import { spinnerPage } from './shared/components/spinner/spinner';
import { AdminPanel } from './shared/components/adminPanel/adminPanel';
import { AdminGuard } from './guard/admin.guard';
import { usermanagement } from './shared/components/usermanagement/usermanagement';
import { admin_changeinfo } from './shared/components/admin_updateinfo/admin.updateinfo';
import { PackageshopcardComponent } from './shared/components/packageshopcard/packageshopcard.component';
import { ViewSurveyComponent } from './shared/components/view-survey/view-survey.component';
import { AdduserComponent } from './shared/components/adduser/adduser.component';
import { EditFormReviewComponent } from './shared/components/edit-form-review/edit-form-review.component';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { ViewAnswersComponent } from './shared/components/view-answers/view-answers.component';
import { EditDiscountComponent } from './shared/components/edit-discount/edit-discount.component';
import { HeadermenuComponent } from './shared/components/headermenu/headermenu.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor.service';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { ActiveFormReviewsComponent } from './shared/components/active-form-reviews/active-form-reviews.component';
import { DoneFormReviewsComponent } from './shared/components/done-form-reviews/done-form-reviews.component';
import { AnswerCountFilterPipe } from './shared/pipes/answer-count-filter.pipe';
import { ShowDatePipe } from './shared/pipes/show-date.pipe';
import { IsFormActivePipe } from './shared/pipes/is-form-active.pipe';
import { SearchFormsComponent } from './shared/components/search-forms/search-forms.component';
import { IsSeenPipe } from './shared/pipes/is-seen.pipe';
import { AddSubMembersComponent } from './shared/components/add-sub-members/add-sub-members.component';
import { AllPackagesComponent } from './shared/components/Allpackages/allpackages';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { BillComponent } from './shared/components/bill/bill.component';
import {NgxPrintModule} from 'ngx-print';
import {OrderManagementComponent} from '../app/shared/components/ordermanagement/ordermgn'
import { OrderUserComponent } from './shared/components/orderuser/orderuser';
import {UserSearchComponent} from './shared/components/usersearch/usersearch';
import { PackagePageComponent } from './shared/components/package-page/package-page.component'
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { NgxSpinnerModule } from "ngx-spinner";
import { AboutUsComponent } from './shared/components/about-us/about-us.component';
import { ContactUsComponent } from './shared/components/contact-us/contact-us.component';
import { RulsComponent } from './shared/components/ruls/ruls.component';
import { PrivacyPolicyComponent } from './shared/components/privacy-policy/privacy-policy.component';
import { ProfileSurveysComponent } from './shared/components/profile-surveys/profile-surveys.component';
import { SurveyManagementComponent } from './shared/components/survey-management/survey-management.component';
@NgModule({
  imports: [
    NgxPrintModule,
    BrowserModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatRadioModule,
    MatDatepickerModule,
    HttpClientModule,
    RouterModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatTabsModule,
    MatSidenavModule,
    MatDialogModule,
    MatStepperModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatExpansionModule,
    NgPersianDatepickerModule,
    ClipboardModule,
    MatExpansionModule,
    InfiniteScrollModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ErrorSnackbar,
    OkSnackbar,
    ErrorSnackbarSignup,
    OkSnackbarSignup,
  ],
  providers: [
    PostService,
    AuthGuard,
    DatePipe,
    AdminGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  declarations: [
    AppComponent,
    SurveyCardComponent,
    ViewSurveyComponent,
    Dashboard,
    FormField,
    FormFieldPrefixSuffixExample,
    SelectReactiveFormExample,
    DialogContentExample,
    DialogContentExampleDialog,
    StepperEditableExample,
    SidenavAutosizeExample,
    AuthUser,
    ErrorSnackbar,
    SuccessfullSurveyComponent,
    AllSurveysComponent,
    SuccessfullAnswerComponent,
    SurveyReadOnlyComponent,
    PackagesComponent,
    CreatePackageComponent,
    PackageManagerComponent,
    EditPackageComponent,
    DiscountManagerComponent,
    CreateDiscountComponent,
    PackageshopcardComponent,
    usermanagement,
    changeinfo,
    spinnerPage,
    AdminPanel,
    admin_changeinfo,
    DialogContentDialog,
    AdduserComponent,
    EditFormReviewComponent,
    ViewAnswersComponent,
    EditDiscountComponent,
    HeadermenuComponent,
    ActiveFormReviewsComponent,
    DoneFormReviewsComponent,
    AnswerCountFilterPipe,
    ShowDatePipe,
    IsFormActivePipe,
    SearchFormsComponent,
    IsSeenPipe,
    AddSubMembersComponent,
    NotFoundComponent,
    BillComponent,
    AllPackagesComponent,
    OrderManagementComponent,
    OrderUserComponent,
    UserSearchComponent,
    PackagePageComponent,
    AboutUsComponent,
    ContactUsComponent,
    RulsComponent,
    PrivacyPolicyComponent,
    ProfileSurveysComponent,
    SurveyManagementComponent,
    ],
})
export class AppModule {}
