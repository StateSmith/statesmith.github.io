example drawio examples need to be exported with svgdata plugin so that we can get their IDs.

examples also require web server. local file access won't allow modifying svg diagram with js.


function getSubDocument(embedding_element)
{
    if (embedding_element.contentDocument) 
    {
        return embedding_element.contentDocument;
    } 
    else 
    {
        return subdoc = embedding_element.getSVGDocument();
    }

    TODO throw if null...
}