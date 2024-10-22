import { UserSearchComponent } from './shared/components/usersearch/usersearch';
import { AdminPanel } from './shared/components/adminPanel/adminPanel';
import { AuthGuard } from './guard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './shared/components/dashboard/dashboard';
import { AuthUser } from './shared/components/signUpIn/Auth';
import { FormField } from './shared/components/FormField/formfield';
import { SurveyCardComponent } from './shared/components/survey-card/survey-card.component';
import { ViewSurveyComponent } from './shared/components/view-survey/view-survey.component';
import { SuccessfullSurveyComponent } from './shared/components/successfull-survey/successfull-survey.component';
import { AllSurveysComponent } from './shared/components/all-surveys/all-surveys.component';
import { SuccessfullAnswerComponent } from './shared/components/successfull-answer/successfull-answer.component';
import { SurveyReadOnlyComponent } from './shared/components/survey-read-only/survey-read-only.component';
import { PackagesComponent } from './shared/components/packages/packages.component';
import { CreatePackageComponent } from './shared/components/create-package/create-package.component';
import { PackageManagerComponent } from './shared/components/package-manager/package-manager.component';
import { EditPackageComponent } from './shared/components/edit-package/edit-package.component';
import { DiscountManagerComponent } from './shared/components/discount-manager/discount-manager.component';
import { CreateDiscountComponent } from './shared/components/create-discount/create-discount.component';
import { changeinfo } from './shared/components/updateinfo/updateinfo';
import { AdminGuard } from './guard/admin.guard';
import { usermanagement } from "./shared/components/usermanagement/usermanagement";
import { admin_changeinfo } from "./shared/components/admin_updateinfo/admin.updateinfo";
import { PackageshopcardComponent } from './shared/components/packageshopcard/packageshopcard.component';
import { AdduserComponent } from './shared/components/adduser/adduser.component';
import { EditFormReviewComponent } from './shared/components/edit-form-review/edit-form-review.component';
import { ViewAnswersComponent } from './shared/components/view-answers/view-answers.component';
import { EditDiscountComponent } from './shared/components/edit-discount/edit-discount.component';
import { ActiveFormReviewsComponent } from './shared/components/active-form-reviews/active-form-reviews.component';
import { DoneFormReviewsComponent } from './shared/components/done-form-reviews/done-form-reviews.component';
import { SearchFormsComponent } from './shared/components/search-forms/search-forms.component';
import { AddSubMembersComponent } from './shared/components/add-sub-members/add-sub-members.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { BillComponent } from './shared/components/bill/bill.component';
import { AllPackagesComponent } from './shared/components/Allpackages/allpackages';
import { OrderManagementComponent } from './shared/components/ordermanagement/ordermgn';
import { OrderUserComponent } from './shared/components/orderuser/orderuser';
import { PackagePageComponent } from './shared/components/package-page/package-page.component';
import { AboutUsComponent } from './shared/components/about-us/about-us.component';
import { ContactUsComponent } from './shared/components/contact-us/contact-us.component';
import { RulsComponent } from './shared/components/ruls/ruls.component';
import { PrivacyPolicyComponent } from './shared/components/privacy-policy/privacy-policy.component';
import { ProfileSurveysComponent } from './shared/components/profile-surveys/profile-surveys.component';
import { SurveyManagementComponent } from './shared/components/survey-management/survey-management.component';
const routes: Routes = [

  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: Dashboard,
  },
  {
    path: 'Login',
    component: AuthUser,
  },
  {
    path: 'updateinfo',
    component: changeinfo,
  },
  {
    path: 'AdminPanel',
    component: AdminPanel,
    // canActivate: [AdminGuard],
  },
  {
    path: 'Formfield',
    component: FormField,
  },
  {
    path: 'CreateSurvey',
    component: SurveyCardComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'ViewSurvey/:code',
    component: ViewSurveyComponent,
    //canActivate:[AuthGuard]
  },
  {
    path: 'Success/:code',
    component: SuccessfullSurveyComponent,
  },
  {
    path: 'AdminPanel/UserManagement',
    component: usermanagement,
    // canActivate: [AdminGuard],
  },
  {
    path: 'AllOrders',
    component: OrderUserComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'AdminPanel/OrderManagement',
    component: OrderManagementComponent,
    // canActivate: [AdminGuard],
  },
  {
    path: 'AdminPanel/UserManagement/ChangeInfo',
    component: admin_changeinfo,
    // canActivate: [AdminGuard],
  },
  {
    path: 'AdminPanel/UserManagement/SearchUser',
    component: UserSearchComponent,
    // canActivate: [AdminGuard],
  },
  {
    path: 'Success',
    component: SuccessfullSurveyComponent,
  },
  {
    path: 'AllSurveys',
    component: AllSurveysComponent,
  },
  {
    path: 'SuccessAnswer/:code',
    component: SuccessfullAnswerComponent,
  },
  {
    path: 'viewSurvey',
    component: ViewSurveyComponent,
  },
  {
    path: 'surveyReadOnly/:code',
    component: SurveyReadOnlyComponent,
  },
  {
    path: 'Packages',
    component: PackagePageComponent,
  },
  {
    path: 'allPackages',
    component: AllPackagesComponent,
  },
  {
    path: 'AdminPanel/PackageManager',
    component: PackageManagerComponent,
  },
  {
    path: 'AdminPanel/PackageManager/CreatePackage',
    component: CreatePackageComponent,
  },
  {
    path: 'AdminPanel/PackageManager/EditPackage/:id',
    component: EditPackageComponent,
  },
  {
    path: 'AdminPanel/DiscountManager',
    component: DiscountManagerComponent,
  },
  {
    path: 'AdminPanel/DiscountManager/CreateDiscount',
    component: CreateDiscountComponent,
  },
  {
    path: 'Packages/Packageshopcard',
    component: PackageshopcardComponent,
  },
  {
    path: 'addSubMember/Adduser',
    component: AdduserComponent,
  },
  {
    path: 'EditFormReview/:code',
    component: EditFormReviewComponent,
  },
  {
    path: 'ViewAnswers/:code',
    component: ViewAnswersComponent,
  },
  {
    path: 'EditDiscount/:id',
    component: EditDiscountComponent,
  },
  {
    path: 'activeFormViews',
    component: ActiveFormReviewsComponent,
  },
  {
    path: 'doneFormViews',
    component: DoneFormReviewsComponent,
  },
  {
    path: 'searchForms',
    component: SearchFormsComponent,
  },
  {
    path: 'addSubMember',
    component: AddSubMembersComponent,
  },
  {
    path: 'Packageshopcard/bill',
    component: BillComponent
  },
  {
    path: 'aboutUs',
    component: AboutUsComponent
  },
  {
    path: 'contactUs',
    component: ContactUsComponent
  },
  {
    path: 'rules',
    component: RulsComponent
  },
  {
    path: 'privacyPolicy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'myProfileSurveys',
    component: ProfileSurveysComponent
  },
  {
    path: 'AdminPanel/surveyManagement',
    component: SurveyManagementComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
