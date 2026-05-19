namespace galactic.spacefarer;

entity Spacefarer {
    key ID     : UUID;
        firstName: String(100);
        lastName : String(100);
        email    : String(100);
        originPlanet : Association to Planet;
        spacesuitColor: String(50);
        stardustCollection: String(255);
        wormholeNavigationSkill: Integer;
        department : Association to Department;
        position : Association to Position;
}

entity Planet {
    key ID     : UUID;
        name   : String(100);
        sector : String(50);
}

entity Department {
    key ID     : UUID;
        name   : String(100);
        description : String(50);
}

entity Position {
    key ID     : UUID;
        title   : String(100);
        rank : String(50);
}
