/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

import DocumentService = require('TYPO3/CMS/Core/DocumentService');
import FormEngine = require('TYPO3/CMS/Backend/FormEngine');
import RegularEvent = require('TYPO3/CMS/Core/Event/RegularEvent');

class InputDateTimeElement {
  private element: HTMLInputElement = null;

  constructor(elementId: string) {
    DocumentService.ready().then((): void => {
      this.element = document.getElementById(elementId) as HTMLInputElement;
      this.registerEventHandler();
      require(['../../DateTimePicker'], (DateTimePicker: any): void => {
        DateTimePicker.initialize(this.element)
      });
    });
  }

  private registerEventHandler(): void {
    new RegularEvent('formengine.dp.change', (e: CustomEvent): void => {
      FormEngine.Validation.validate();
      FormEngine.Validation.markFieldAsChanged(e.detail.element);

      document.querySelectorAll('.module-docheader-bar .btn').forEach((btn: HTMLButtonElement): void => {
        btn.classList.remove('disabled');
        btn.disabled = false;
      });
    }).bindTo(document);
  }
}

export = InputDateTimeElement;
