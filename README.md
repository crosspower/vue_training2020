# vue-router

## 概要

## スタートアップ
### 1. モジュールのインストール
vue-routerを使うには、モジュールのインストールが必要。
`npm install vue-router`
### 2. main.jsの書き換え
main.jsにてnewしているVueオブジェクトのオプションとして、
routerという物がある。
これにrouter属性をつけることで、このオブジェクト内でrouter-viewコンポーネントを使用することができる。

```javascript
new Vue({
    router: *ルーターオブジェクト*,
    render: h => h(App),
}).$mount('#app')
```

ここではルーターオブジェクトをファイルとして外出しする。

### 3. routerオブジェクトの定義
router.js
```javascript
import Vue from 'vue';
import Router from 'vue-router';
import Home from "./views/Home.vue";
import Users from "./views/Users.vue";

Vue.use(Router)

export default new Router({
    routes:[{path: '/', component: Home}, {path: '/users', component: Users}]
})
```

ここでroutes内には配列で、URLのパスと、呼び出すコンポーネントを対応させる。

### 4. 動作確認
実際に`npm run serve`でサーバーを立ち上げ、
URLとして、以下の二つを試してページが書き換わることを確認する。
- *localhost:8000/#*
- *localhost:8000/#/users* 


## historyモードの設定
### 背景
Vue-routerはデフォルトでhashモードというものに設定されている。

setting | default | example 
--------- | --------- | ---------  
 hash | True | http://localhost:8000/#/users
 history | False | http://localhost:8000/users 

しかし、人によってはこの#を表示させたくないという場合もあるだろう。そんな時に有用なのが、historyモードだ。
これを設定することで以下のような設定がなされる。

- URL上に#が表示されなくなる
- URLのリクエストの度にブラウザからリクエストが飛ぶ

一つ目は目的の通りだが、二つ目についてはサーバー側でURLが飛んできた時に **必ずindex.htmlを返すように設定する** 必要がある。
これについては公式のページを参照いただきたい。

### 設定方法
routerオブジェクト内にて、modeオプションを設定すれば良い。
```javascript
export default new Router({
    mode: 'history',
    routes:[{path: '/', component: Home}, {path: '/users', component: Users}]
})
```

## URLパラメータの取得
### 方法１　routerオブジェクトで設定
pathに`~path~:~param~`という形で設定する。
```javascript
routes:[
    {path: '/', component: Home}, 
    {path: '/users/:id', component: Users}
]
```

### パラメータの取得
```javascript
$route.params.id
```

### 方法２　密結合を避ける方法
現状の$route.params.idだと、Usersコンポーネントを他の場所で使おうという時に、URLパラメータしか呼び出せない。（通常の変数を当てはめたりできない）  
→　できればただの変数としたい！
#### 実現方法
routerオブジェクト内で、ルートにてpropsをtrueとする。
```javascript
export default new Router({
    mode: 'history',
    routes: [
        {path: "/", component: Home},
        {path: "/users/:id", component: Users, props: true}
    ]
})
```
これにより、Users.vue側ではpropsで受け取ることができる。

## ボタンによる画面遷移
### Bad Case
一つの例としてaタグで遷移しようと考えるのが普通であると思われるが、これはベストプラクティスではない。
設定して、画面遷移してみればいいのだが画面がフラッシュしていることがわかると思う。これではSPAの良さが全く生かされない。

### 実装方法
```javascript
    <router-link to="/" class="link" tag="button">HOME</router-link>
    <router-link to="/users" class="link" tag="button">USERS</router-link>
```
hrefの代わりに`to`を、タグはデフォルトでaタグになるので、tagクラスで指定してみた。

### アクティブ時スタイルの指定方法
router-linkのオプションでは、`active-class`という物がある。これにより*包含的な一致*をするリンクでクラスが適用される。
```javascript
<router-link 
    to="/"
    class="link"
    active-class="link--active"
>HOME</router-link>
```
※もし包含的ではない完全一致が希望の場合には、これにexactオプションをつけるだけで良い。
```javascript
<router-link 
    to="/"
    class="link"
    active-class="link--active"
    exact
>HOME</router-link>
```

## スクリプト内でリンクにアクセスする
```javascript
this.$router.push('users')
```
このように、script内で$routerのpushメソッドを用いることで画面遷移することが可能だ。  
pushする内容はオブジェクトでも良い。
```javascript
this.$router.push({path: "users"})
```

## URLのネスト
### 例
routerオブジェクト内に下記のようにchildrenを記述する。
```javascript
routes: [
    {path: '/', component: Home},
    {path: '/users/:id',
     component: Users,
     props: true,
     children: [
         {path: 'posts', component: UsersPosts},
         {path: 'profile', component: UsersProfile}
     ]
    }
]
```
これを呼び出すUsersコンポーネントでrouter-viewを呼び出す。

## 動的なto
```javascript
<router-link :to="'/users/'+(Number(id)+1)">次のUser</router-link>
```


## ナレッジ
### 1. なぜURLには#が入ってくるのか？
http://localhost:8080/#/users  
この中でURLとして成立しているのは、http://localhost:8080/　までであり、それ以降はページ内のID呼び出しに過ぎない。
すなわち、ページ内のアンカーを呼び出すような形と同様である。
基本的にはVue.jsではURLに対してindex.htmlしか返さないので、それ以降は動的コンポーネントで対応する。
今回の中で、具体的に動的コンポーネントとは
`<router-view></router-view>`のことを指す。

### 2. router-linkではデフォルトでaタグになるが、なぜ画面遷移しない？
詳細な説明はできないが、router-linkを使用した形をとると、アクセスに行く前の段階で待ったを書けることができるらしい。
**→要調査**

### 3. router-linkでのIDによる遷移はライフサイクルフックが走らない
例えば、下記二つを交互に切り替えた場合、createdのメソッドが走ることはない。
#### Bad Case
《リンク部分》
```javascript
<router-link to="/users/5">
<router-link to="/users/6">
```
《スクリプト部分》
```javascript
created(){
    console.log("created")
}
```
#### Best Practice
《スクリプト部分》
```javascript
watch:{
    $route(to, from){
        console.log(to)
        console.log(from)
    }
}
```
### 4. router-viewで呼び出している中ではrouter-viewが使えない
以下のように書いてみよう！
App.vue
    - router-view(Home)
        - ✖︎ router-view
    - Home
        - router-view(Home)
            - ✖︎ router-view




# 気になること
- エラーの場合の画面表示設定
- $routeと$routerの詳細　→　ドキュメント参照

