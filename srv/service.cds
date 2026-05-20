using { 
    galactic.spacefarer.Spacefarer,
    galactic.spacefarer.Planet,
    galactic.spacefarer.Department,
    galactic.spacefarer.Position
 } from '../db/schema';

@(requires: 'authenticated-user')
service GalacticService {

    @odata.draft.enabled
    entity Spacefarers as projection on Spacefarer;
    
    entity Planets as projection on Planet;
    entity Departments as projection on Department;
    entity Positions as projection on Position;
}