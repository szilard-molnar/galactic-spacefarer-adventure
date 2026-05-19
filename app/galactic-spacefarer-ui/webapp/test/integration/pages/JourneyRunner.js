sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"galactic/spacefarer/galacticspacefarerui/test/integration/pages/SpacefarersList",
	"galactic/spacefarer/galacticspacefarerui/test/integration/pages/SpacefarersObjectPage"
], function (JourneyRunner, SpacefarersList, SpacefarersObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('galactic/spacefarer/galacticspacefarerui') + '/test/flp.html#app-preview',
        pages: {
			onTheSpacefarersList: SpacefarersList,
			onTheSpacefarersObjectPage: SpacefarersObjectPage
        },
        async: true
    });

    return runner;
});

