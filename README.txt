这是我学习grunt时自己搭建的一个自动化构建工具样例。
整个工具以页面为单位，对静态资源进行简单的打包，压缩，雪碧图自动生成，以及开发过程中自动监视、js语法检查，实现自动化、持续化开发。
首先grunt安装，我用npm包管理工具进行在线安装（node.js自带npm或者单独下载）。

1、先安装grunt的CLI：npm install grunt-cli -g    //全局安装，方便在任何工作目录下执行grunt命令

2、接下来需要创建一个名为package.json的清单文件，这个文件用于描述Node.js项目，指明项目依赖的包列表，还有一些元信息，例如项目名称、版本、描述和主页。你需要将grunt的信息添加到该文件中作为一个开发依赖（在本地开发环境中使用）。在文件中任意写一个json代码，如{}，保存。

3、本地安装grunt  npm install grunt --save-dev   (修饰符指明这是个开发依赖，安装完成后打开package.json，即可看到grunt信息)

4、创建Gruntfile.js文件。grunt使用这个文件加载可用的任务，并使用所需参数配置任务。

安装完成后便可进行任务配置了，先简单介绍下Gruntfile.js文件。
	module.exports=function(grunt){             //公开接口
		grunt.initConfig({                          //初始化配置
			jshint:['Gruntfile.js']                 //任务配置,冒号左边为任务名称，右边为配置参数
		});
		grunt.loadNpmTasks('grunt-contrib-jshint'); //加载包
		grunt.registerTasks('default',['jshint']);  //注册别名，一个参数为自定义别名，第二个参数为执行的任务（数组）
	};
	说明：每次配置任务时，先通过npm下载包，然后在Gruntfile.js文件中加载，最后配置具体任务，缺一不可。
	执行命令：grunt+空格+任务配置时名称。如上面执行命令为grunt jshint
		配置完成后，可根据业务场景需要，将任务按顺序组合，注册别名，执行时便可通过执行别名自动执行一系列任务。如上面便可通过执行grunt default执行jshint。

做开发时，只需关注src文件内容的编写，css、js、图片背景等均可按最小粒度进行开发
以上便是grunt使用配置方式，具体任务便可根据需要查找文档，进行任务配置，附上npm官方文档链接  https://www.npmjs.com/

本样例中使用的包可在Gruntfile.js或package.json中查看，具体配置方法可查看Gruntfile.js文件，不再详细阐述，遇到问题自己去查文档，文档内信息非常详细


