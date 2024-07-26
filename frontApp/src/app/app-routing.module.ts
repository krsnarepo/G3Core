import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './modules/auth/guards/auth.guard';
import { paymentGuard } from './modules/payment/guards/payment.guard';

const routes: Routes = [
  
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule), canActivate:[authGuard] },
  { path: 'login', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'forms', loadChildren: () => import('./modules/shipping-form/shipping-form.module').then(m => m.ShippingFormModule), canActivate:[authGuard] },
  { path: 'payment', loadChildren: () => import('./modules/payment/payment.module').then(m => m.PaymentModule), canActivate:[authGuard, paymentGuard] },
  { path: 'confirmpay', loadChildren: () => import('./modules/confirmpay/confirmpay.module').then(m => m.ConfirmpayModule), canActivate:[authGuard, paymentGuard] },
  { path: 'generatereceipt', loadChildren: () => import('./modules/generate-receipt/generate-receipt-routing.module').then(m => m.GenerateReceiptRoutingModule), canActivate:[authGuard] },
  
  { path: 'generatedocument', loadChildren: () => import('./modules/generate-document/generate-document.module').then(m => m.GenerateDocumentModule), canActivate:[authGuard] },
  { path: 'updatedocument', loadChildren: () => import('./modules/update-document/update-document.module').then(m => m.UpdateDocumentModule), canActivate:[authGuard] },
  { path: 'validatecode', loadChildren: () => import('./modules/validate-code/validate-code.module').then(m => m.ValidateCodeModule), canActivate:[authGuard] },
  { path: 'classifypackages', loadChildren: () => import('./modules/classify-packages/classify-packages.module').then(m => m.ClassifyPackagesModule), canActivate:[authGuard] },
  { path: 'pricetable', loadChildren: () => import('./modules/price-table/price-table.module').then(m => m.PriceTableModule), canActivate:[authGuard] },

  { path: 'delivery', loadChildren: () => import('./modules/delivery-form/delivery-form.module').then(m =>m.DeliveryFormModule ), canActivate:[authGuard] },
  { path: 'assign', loadChildren: () => import('./modules/assign/assign.module').then(m => m.AssignModule), canActivate:[authGuard] },
  { path: 'keep', loadChildren: () => import('./modules/keep-availability/keep-availability.module').then(m => m.KeepAvailabilityModule ), canActivate:[authGuard] },
  { path: 'orderlist', loadChildren: () => import('./modules/order-list/order-list.module').then(m =>m.OrderListModule ), canActivate:[authGuard] },
  { path: 'update', loadChildren: () => import('./modules/update-status/update-status.module').then(m => m.UpdateStatusModule), canActivate:[authGuard] },
  { path: 'mobility', loadChildren: () => import('./modules/mobility/mobility.module').then(m => m.MobilityModule), canActivate:[authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
