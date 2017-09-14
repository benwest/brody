var m = require('mithril');
var Frames = require('../frames/Frames');

module.exports = {
    
    oninit: ({ state, attrs: { disciplines } }) => {
        
        state.structure = {
            type: 'list',
            attrs: {
                title: 'root',
                children: disciplines.map( discipline => ({
                    type: 'list',
                    attrs: {
                        title: discipline.name,
                        anchor: discipline.name,
                        children: discipline.projects.map( project => ({
                            type: 'item',
                            attrs: {
                                title: project.title,
                                content: project.hero
                            }
                        }) )
                    }
                }) )
            }
        }
        
    },
    
    view: ({ attrs: { scrollAnchors }, state: { structure }}) => {
        
        return <Frames scrollAnchors={ scrollAnchors } structure={ structure }/>
        
    }
    
}