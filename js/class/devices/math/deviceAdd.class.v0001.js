class DeviceAdd extends DeviceOpAmp {

    // init initializes the generic device
    init() {
        this.ornamentDraw = new OrnamentAdd();
        this.ornamentDraw.init();
        super.setOrnamentDraw(this.ornamentDraw)

        super.init();
    }
}
