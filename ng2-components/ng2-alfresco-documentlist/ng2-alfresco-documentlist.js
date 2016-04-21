System.register(['./src/document-list.component', './src/alfresco.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var document_list_component_1, alfresco_service_1;
    var ALFRESCO_DIRECTIVES, ALFRESCO_PROVIDERS;
    var exportedNames_1 = {
        'ALFRESCO_DIRECTIVES': true,
        'ALFRESCO_PROVIDERS': true
    };
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (document_list_component_1_1) {
                document_list_component_1 = document_list_component_1_1;
                exportStar_1(document_list_component_1_1);
            },
            function (alfresco_service_1_1) {
                alfresco_service_1 = alfresco_service_1_1;
                exportStar_1(alfresco_service_1_1);
            }],
        execute: function() {
            exports_1("default",{
                directives: [document_list_component_1.DocumentList],
                providers: [alfresco_service_1.AlfrescoService]
            });
            exports_1("ALFRESCO_DIRECTIVES", ALFRESCO_DIRECTIVES = [document_list_component_1.DocumentList]);
            exports_1("ALFRESCO_PROVIDERS", ALFRESCO_PROVIDERS = [alfresco_service_1.AlfrescoService]);
        }
    }
});
//# sourceMappingURL=ng2-alfresco-documentlist.js.map