import { AR_Manager } from "@mirrar-sdm/minimal-ar-react-native-sdk"
import type { ProductInput } from "@mirrar-sdm/minimal-ar-react-native-sdk"

class AR_Service {
    
    arEngineSetupDone = false
    currentMode = 'model'

    constructor() {
        this.setupAR_Engine()
    }

    setupAR_Engine() {
        console.log("Setting up AR Engine")
        if(!this.arEngineSetupDone) {
            AR_Manager.setupAR_Engine('face')
            this.arEngineSetupDone = true
        }
    }

    switchToModel(model: string) {
        this.currentMode = 'model'
        AR_Manager.switchToModelModeFromCamera(model)
    }

    switchToCamera() {
        this.currentMode = 'camera'
        AR_Manager.switchToCameraModeFromModel()
    }

    addProduct(product: ProductInput) {
        AR_Manager.addProduct(product)
    }

    removeProduct(product: ProductInput) {
        AR_Manager.removeProduct(product)
    }

    setupFaceTracking() {
        AR_Manager.setupFaceTracking()
    }

    setupHandTracking() {
        AR_Manager.setupHandTracking()
    }

    changeModelImage(model: string) {
        this.switchToModel(model)
    }

}

let arService = new AR_Service()

export {
    arService as AR_Service
}