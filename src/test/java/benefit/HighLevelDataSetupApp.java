package benefit;

import uk.gov.hmcts.befta.dse.ccd.CcdEnvironment;
import uk.gov.hmcts.befta.dse.ccd.DataLoaderToDefinitionStore;

import java.util.Arrays;


public class HighLevelDataSetupApp extends DataLoaderToDefinitionStore {

    private static final String definitionsPath = "ccd_definition";

    public HighLevelDataSetupApp(CcdEnvironment dataSetupEnvironment) {
        super(dataSetupEnvironment, definitionsPath);
    }

    public static void main(String[] args) throws Throwable {
        //TODO remove this when prod deployment reddy
        skipProd(args);

        main(HighLevelDataSetupApp.class, args);
    }

    private static void skipProd(String[] args) {
        if (args.length >= 1) {
            try {
                CcdEnvironment environment = CcdEnvironment.valueOf(args[0].toUpperCase());
                if (CcdEnvironment.PROD.equals(environment)) {
                    throw new IllegalArgumentException(
                            "Prod is not ready yet");
                }
            } catch (IllegalArgumentException e) {
            }
        }

    }

    @Override
    protected boolean shouldTolerateDataSetupFailure() {
        return true;
    }

    @Override
    protected void doLoadTestData() {
        importDefinitions();
    }
}
