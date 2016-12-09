module.exports=function(grunt){
	grunt.initConfig({
		//js语法检查
		jshint:[
			'./src/js/*.js',
			'Gruntfile.js'
		],
		//文件打包
		concat:{
			css:{
				files:{
					'./assets/css/bundle.css':'./src/css/**/*.css'
				}
			},
			js:{
				files:{
					'./assets/js/dropdown.js':'./src/js/**/*.js'
				}
			}
		},
		//js压缩
		uglify:{
			js:{
				files:{
					'./assets/js/dropdown.min.js':'./assets/js/dropdown.js'
				}
			}
		},
		//css压缩
		cssmin:{
			css:{
				files:{
					'./assets/css/bundle.min.css':'./assets/css/bundle.sprite.css'
				}
			}
		},
		//文件清除
		clean:{
			images:'./assets/images/*',
			js:'./assets/js/*',
			css:'./assets/css/*'
		},
		//雪碧图生成
		sprite:{
			options:{
				 // sprite背景图源文件夹，只有匹配此路径才会处理
				imagepath: './assets/images/',
				// 雪碧图输出目录，注意，会覆盖之前文件！
				spritedest: './assets/sprite/',
			},
			autoSprite: {
		        files: [{
		            // 启用动态扩展
		            expand: true,
		            // css文件源的文件夹
		            cwd: './assets/css/',
		            // 匹配规则
		            src: '*.css',
		            // 导出css和sprite的路径地址
		            dest: './assets/css/',
		            // 导出的css名
		            ext: '.sprite.css'
		        }]
    		}
		},
		//文件复制
		copy:{
			//复制文件
			images:{
				expand: true,
			    cwd: './src/images',
			    src: '*',
			    dest: './assets/images/',
			},
			//复制整颗子树
			folder:{
				expand:true,
				src:'src/*',
				dest:'./assets/'
			}
		},
		//监听
		watch:{
			//与浏览器插件配合实现监听自动刷新
			livereload:{				
				files:[
					'./src/css/*.css',
					'./src/js/*.js',
					'./src/*.html'
				],
				options:{
					livereload:true
				}
			},
			copy:{
				tasks:['copy:images']
			},
			//监听文件变动，自动运行任务
			jshint:{
				tasks:['jshint'],
				files:['./src/js/*.js']
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-css-sprite');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	//个人觉得单页面文件或单组件合适的顺序为clean->copy->concat->sprite->uglify
	grunt.registerTask('build',['clean','copy','concat','sprite','uglify:js','cssmin:css']);
	grunt.registerTask('default',['jshint']);
};