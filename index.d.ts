declare namespace Solar {
    interface Colors {
        red: string;
        lightRed: string;
        orange: string;
        lightOrange: string;
        yellow: string;
        lightYellow: string;
        green: string;
        lightGreen: string;
        blue: string;
        lightBlue: string;
        purple: string;
        lightPurple: string;
        pink: string;    };

    class Embed {
        setTitle(title: string): this;
        setDescription(desc: string): this;
        setColor(color: Colors): this;
    };
    
    class Client {
        startGateway(token?: string): void;
    }
}

export = Solar;
