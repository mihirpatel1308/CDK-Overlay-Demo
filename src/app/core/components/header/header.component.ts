import { Component, ComponentRef, Input, OnInit } from '@angular/core';
import { ProfileStandardClaims } from 'oidc-client';
import { AuthService } from '../../services/auth/auth.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { take } from 'rxjs';
import { Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  /** user profile data */
  @Input() userData!: ProfileStandardClaims;
  
  constructor(private _authService: AuthService,
    private overlay: Overlay,) { }

  ngOnInit(): void {
  }

  public openFilter(): void {
    let componentRef: ComponentRef<UserProfileComponent>;
    let overlayRef: OverlayRef;

    const overlayConfig: OverlayConfig = new OverlayConfig();
    overlayConfig.hasBackdrop = true;
    overlayConfig.backdropClass = 'dark-backdrop';
    // create overlay reference
    overlayRef = this.overlay.create(overlayConfig);
    const portal: ComponentPortal<UserProfileComponent>
      = new ComponentPortal<UserProfileComponent>(UserProfileComponent);
    // attach overlay with portal
    componentRef = overlayRef.attach(portal);
    overlayRef.backdropClick().pipe(take(1)).subscribe(() => {
      overlayRef.detach();
    });
    // componentRef.instance.filterData.subscribe((response) => {
     
    // });
    // componentRef.instance.filterValues = this.filterData;
    // componentRef.instance.trafficLocationListData =trafficLocationListData;
    // componentRef.instance.language =language;
    // componentRef.instance.closeFilter.subscribe(() => { overlayRef.detach() });
  }

  public logout() {
    this._authService.logout();
  }
}
