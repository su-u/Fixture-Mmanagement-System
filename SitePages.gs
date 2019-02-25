function getListItemsData() {
    var page = SitesApp.getPageByUrl("https://sites.google.com/a/unitech.jp/system2/home");

    //リストの取得
    var html = HtmlService.createTemplateFromFile('Id.html');
    var data = findRow(001, 2)
    html.data = data;
    page.createWebPage("test", "testname", html)
}
