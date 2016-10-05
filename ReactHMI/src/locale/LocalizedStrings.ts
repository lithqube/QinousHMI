/**
  * Defines all localized texts of this application. 
  * 
  * Specific localizations have to conform to this interface. That way, 
  * we can ensure that a localization contains all required fields. As an
  * added bonus we get autocompletion, too.
  *
  * To add a new field, define it here first. Then update all localizations.
  */
export interface LocalizedStrings {
    common : {
        error: string
    },
    footer : {
        systemGridVoltage: string
        gridFrequency: string
    }
}
