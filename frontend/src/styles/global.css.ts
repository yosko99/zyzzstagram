import { createGlobalStyle } from 'styled-components';

const GlobalCSS = createGlobalStyle`
	* {
		margin: 0;
		font-family: 'Nunito', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	p {
		font-family: 'Nunito', sans-serif !important;
	}

	code {
		font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
			monospace;
	}

	/* Progress bar */
	#nprogress .bar {
		background: rgb(166, 255, 0) !important;
	}

	#nprogress .peg {
		box-shadow: 0 0 10px red, 0 0 5px red !important;
	}

	#nprogress .spinner-icon {
		border-top-color: red !important;
		border-left-color:rgb(255, 170, 101) !important;
	}

	.main{
		width: 100%;
		display: flex;
		justify-content: center;
	}
	
	.wrapper{
		width: 100%;
		max-width: 500px;
	}
	
	.left-col{
		display: flex;
		flex-direction: column;
	}
	
	.status-wrapper{
		width: 100%;
		height: 120px;
		background: #fff;
		border: 1px solid #dfdfdf;
		border-radius: 2px;
		padding: 10px;
		padding-right: 0;
		display: flex;
		align-items: center;
		overflow: hidden;
		overflow-x: auto;
	}
	
	.status-wrapper::-webkit-scrollbar{
		display: none;
	}
	
	.status-card{
		flex: 0 0 auto;
		width: 80px;
		max-width: 80px;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-right: 15px;
	}
	
	.profile-pic{
		width: 70px;
		height: 70px;
		border-radius: 50%;
		overflow: hidden;
		padding: 3px;
		background: linear-gradient(45deg, rgb(255, 230, 0), rgb(255, 0, 128) 80%);
	}
	
	.profile-pic img{
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 50%;
		border: 2px solid #fff;
	}
	
	.username{
		width: 100%;
		overflow: hidden;
		text-align: center;
		font-size: 12px;
		margin-top:5px;
		color: rgba(0, 0, 0, 0.5)
	}
	

	.post{
		width: 100%;
		height: auto;
		background: #fff;
		border: 1px solid #dfdfdf;
	}
	
	.info{
		width: 100%;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20px;
	}
	
	.info .username{
		width: auto;
		font-weight: bold;
		color: #000;
		font-size: 14px;
		margin-left: 10px;
	}
	
	.info .options{
		height: 10px;
		cursor: pointer;
	}
	
	.info .user{
		display: flex;
		align-items: center;
	}
	
	.info .profile-pic{
		height: 40px;
		width: 40px;
		padding: 0;
		background: none;
	}
	
	.post-image{
		width: 100%;
		object-fit: cover;
	}
	
	.post-content{
		width: 100%;
		padding: 20px;
	}
	
	.likes{
		font-weight: bold;
	}
	
	.description{
		margin: 10px 0;
		font-size: 14px;
		line-height: 20px;
	}
	
	.description span{
		font-weight: bold;
		margin-right: 10px;
	}
	
	.post-time{
		color: rgba(0, 0, 0, 0.5);
		font-size: 12px;
	}
	
	.comment-wrapper{
		width: 100%;
		height: 50px;
		border-radius: 1px solid #dfdfdf;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.comment-wrapper .icon{
		height: 30px;
	}
	
	.comment-box{
		width: 80%;
		height: 100%;
		border: none;
		outline: none;
		font-size: 14px;
	}
	
	.comment-btn,
	.action-btn{
		width: 70px;
		height: 100%;
		background: none;
		border: none;
		outline: none;
		text-transform: capitalize;
		font-size: 16px;
		color: #007bff;
		opacity: 1;
	}
	
	.reaction-wrapper{
		width: 100%;
		height: 50px;
		display: flex;
		margin-top: -20px;
		align-items: center;
	}
	
	.reaction-wrapper .icon{
		height: 25px;
		margin: 0;
		margin-right: 20px;
	}
	
	.reaction-wrapper .icon.save{
		margin-left: auto;
	}
`;

export default GlobalCSS;
